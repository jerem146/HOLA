export default {
  command: ['toimg', 'toimage'],
  category: 'tools',

  run: async (client, m) => {

    if (!m.quoted) {
      return client.reply(m.chat, '《✧》 Debes citar un sticker.', m)
    }

    let q = m.quoted
    let mime = q.mimetype || ''

    if (!/webp/.test(mime)) {
      return client.reply(m.chat, '《✧》 Debes citar un sticker.', m)
    }

    await m.react('🕒')

    let buffer = await q.download()

    if (!buffer) {
      await m.react('✖️')
      return client.reply(m.chat, '《✧》 No se pudo descargar el sticker.', m)
    }

    try {

      // si el sticker es animado
      if (q.msg?.isAnimated) {

        await client.sendMessage(m.chat, {
          video: buffer,
          gifPlayback: true,
          caption: 'ꕥ *Sticker animado convertido*'
        }, { quoted: m })

      } else {

        await client.sendMessage(m.chat, {
          image: buffer,
          caption: 'ꕥ *Sticker convertido a imagen*'
        }, { quoted: m })

      }

      await m.react('✔️')

    } catch (e) {
      await m.react('✖️')
      client.reply(m.chat, '《✧》 Error al convertir el sticker.', m)
    }

  }
}
