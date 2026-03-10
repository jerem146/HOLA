import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { tmpdir } from 'os'
import Crypto from 'crypto'

export default {
    command: ['toimg', 'tovideo', 'tomp4'],
    category: 'tools',
    run: async (client, m, { usedPrefix, command }) => {
        const q = m.quoted ? m.quoted : m
        const mime = (q.msg || q).mimetype || ''

        if (!/webp/.test(mime)) return client.reply(m.chat, `《✧》 Responde a un sticker.`, m)

        await m.react('🕒')
        try {
            const media = await q.download()
            const isAnimated = q.isAnimated || q.msg?.isAnimated

            if (isAnimated) {
                // --- PROCESO LOCAL CON FFMPEG ---
                const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
                const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)
                
                fs.writeFileSync(tmpFileIn, media)

                // Ejecutamos FFmpeg directamente desde el sistema
                const ffmpeg = spawn('ffmpeg', [
                    '-i', tmpFileIn,
                    '-movflags', 'faststart',
                    '-pix_fmt', 'yuv420p',
                    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
                    '-y', // Sobrescribir si existe
                    tmpFileOut
                ])

                ffmpeg.on('close', async (code) => {
                    if (code === 0 && fs.existsSync(tmpFileOut)) {
                        const videoBuffer = fs.readFileSync(tmpFileOut)
                        await client.sendMessage(m.chat, { video: videoBuffer, caption: 'ꕥ *Convertido localmente ฅ^•ﻌ•^ฅ*' }, { quoted: m })
                        await m.react('✔️')
                    } else {
                        await m.react('✖️')
                        client.reply(m.chat, '《✧》 Error: Tu servidor no soporta la conversión de video local.', m)
                    }
                    // Limpieza total
                    if (fs.existsSync(tmpFileIn)) fs.unlinkSync(tmpFileIn)
                    if (fs.existsSync(tmpFileOut)) fs.unlinkSync(tmpFileOut)
                })

                ffmpeg.on('error', (err) => {
                    console.error('Error de FFmpeg:', err)
                    m.react('✖️')
                })

            } else {
                // Imagen estática (esto siempre funciona porque no requiere FFmpeg)
                await client.sendMessage(m.chat, { image: media, caption: 'ꕥ *Aquí tienes tu imagen ฅ^•ﻌ•^ฅ*' }, { quoted: m })
                await m.react('✔️')
            }
        } catch (e) {
            console.error(e)
            await m.react('✖️')
            client.reply(m.chat, `《✧》 Error al procesar el sticker.`, m)
        }
    }
}
