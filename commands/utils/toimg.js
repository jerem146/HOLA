export default {
  command: ['toimg', 'toimage', 'tovideo'],
  category: 'tools',

  run: async (client, m) => {

    if (!m.quoted) {
      return client.reply(m.chat, '《✧》 Debes citar un sticker, imagen o video.', m)
    }

    await m.react('🕒')

    let q = m.quoted
    let mime = q.mimetype || q.msg?.mimetype || ''

    let buffer = await q.download()

    if (!buffer) {
      await m.react('✖️')
      return client.reply(m.chat, '《✧》 No se pudo descargar el archivo.', m)
    }

    try {

      // STICKER → IMAGEN
      if (/webp/.test(mime)) {
        await client.sendMessage(m.chat, {
          image: buffer,
          caption: 'ꕥ *Sticker convertido a imagen*'
        }, { quoted: m })
      }

      // VIDEO
      else if (/video/.test(mime)) {
        await client.sendMessage(m.chat, {
          video: buffer,
          caption: 'ꕥ *Aquí tienes el video*'
        }, { quoted: m })
      }

      // IMAGEN
      else if (/image/.test(mime)) {
        await client.sendMessage(m.chat, {
          image: buffer,
          caption: 'ꕥ *Aquí tienes la imagen*'
        }, { quoted: m })
      }

      else {
        await m.react('✖️')
        return client.reply(m.chat, '《✧》 Ese formato no es compatible.', m)
      }

      await m.react('✔️')

    } catch (e) {
      await m.react('✖️')
      client.reply(m.chat, '《✧》 Ocurrió un error al convertir.', m)
    }

  }
}
