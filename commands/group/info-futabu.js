export default {
  // Aquí ponemos TODAS las palabras clave que activan estos comandos
  command: [
    'apoyo', 'mejorar', 'apoyobot', 'mejorarbot',
    'comunidad', 'grupocomunidad', 'grupoavisos',
    'concurso', 'concursofutabuclub',
    'contenido', 'contenidopermitido',
    'discord', 'serverdiscord', 'grupodiscord',
    'telegram', 'grupodetelegram',
    'evento', 'eventos'
  ],
  category: 'grupo',
  
  run: async (client, m, args, usedPrefix, command, text) => {
    if (!m.isGroup) return m.reply('❌ Este comando solo se puede usar en grupos.')
    
    switch (command) {
      case 'apoyo':
      case 'mejorar':
      case 'apoyobot':
      case 'mejorarbot':
        m.reply(`*_Aca tienes los 2 bancos para transferir dinero para la mejora del bot!_*

*💸 Paypal:* colapsuspaypal2005@gmail.com (Benjamin Chacon)

*🏦 Banco Virtual (Mercado Pago, Uala, Etc)*
• Alias: COLAPSUSHD2020.UALA
• CBU/CVU: 0000007900204654633937`);
        break;

      case 'comunidad':
      case 'grupocomunidad':
      case 'grupoavisos':
        m.reply(`*GRUPO DE LA COMUNIDAD*

_⚠️| Este grupo será solamente de avisos o noticias relacionada con los grupos de la comunidad Futabu._

Link: https://chat.whatsapp.com/IKCpRmuyrNBL41wb9J2kNO?mode=ac_c`);
        break;

      case 'concurso':
      case 'concursofutabuclub':
        m.reply(`Nada aún!`);
        break;

      // --- CONTENIDO CON IMAGEN ---
      case 'contenido':
      case 'contenidopermitido':
        await client.sendMessage(m.chat, { 
            image: { url: 'https://i.imgur.com/QbQ0XfM.jpeg' }, // <--- CAMBIA ESTO
            caption: `*_✅| CONTENIDO PERMITIDO_*
> ★ Futanari
> ★ Femboys
> ★ Hentai
> ★ Furry
> ★ Feral (Porno de animales animado)
> ★ Transexual
> ★ Hetero
> ★ AI/IA

*_❌| CONTENIDO PROHIBIDO_*
> ✦ Earfuck (Follar/Cojer por la oreja)
> ﹂۞ Sanción: 1 Warn.
> ✦ Scat (Porno de Heces)
> ﹂۞ Sanción: 2 Warns.
> ✦ Necrofilia (Sexo con cadáver)
> ﹂۞ Sanción: Ban.
> ✦ Zoofilia (Porno de animales IRL)
> ﹂۞ Sanción: Ban.
> ✦ Gore (Contenido sangriento)
> ﹂۞ Sanción: Ban.
> ✦ Vore (Comerse Personas)
> ﹂۞ Sanción: 1 Warn.
> ✦ CP (Porno Infantil)
> ﹂۞ Sanción: Ban.
> ✦ Toddler (Relación con bebés) 
> ﹂۞ Sanción: Ban.
> ✦ Lolis (Porno Infantil Animado)
> ﹂۞ Sanción: 2 Warns.
> ✦ Shotas (Porno Infantil Animado)
> ﹂۞ Sanción: 2 Warns.
 
⭐️| Recuerda que la temática tiene que ser más de *_Futanari_*.`
        }, { quoted: m });
        break;

      // --- DISCORD CON IMAGEN ---
      case 'discord':
      case 'serverdiscord':
      case 'grupodiscord':
        await client.sendMessage(m.chat, { 
            image: { url: 'https://i.imgur.com/ON9kQuv.jpeg' }, // <--- CAMBIA ESTO
            caption: `Nuestro Server de Discord!\nLink: https://discord.gg/UjdSaTESQG`
        }, { quoted: m });
        break;

      // --- TELEGRAM CON IMAGEN ---
      case 'telegram':
      case 'grupodetelegram':
        await client.sendMessage(m.chat, { 
            image: { url: 'https://i.imgur.com/8b86WyG.png' }, // <--- CAMBIA ESTO
            caption: `Nuestro grupo de Telegram!\nLink: https://t.me/Futabu_Club`
        }, { quoted: m });
        break;
        
      case 'evento':
      case 'eventos':
        m.reply(`*_Limpieza de Miembros Inactivos (7 de Febrero 2026)_*

Esto se hace como un aviso para empezar a hacer activo en los meses que faltan antes que llegue el dia, traten de ser activos constantemente y aportar una que otra vez contenido. Si son personas ocupadas, traten de pasarse aquí para hablar de vez en cuando.

Si ocurre algún inconveniente durante los siguientes días/meses/semanas debido a cosas de trabajo, escolares, familiares, etc.:

Guarden este link en un portapapeles para recordarlo y pegarlo en WhatsApp; al tocarlo abrirá un chat privado conmigo:

*GUARDA ESTE LINK*: wa.me/+5492604849203

Buena suerte si sobrevives a la purga ese día ;)`);
        break;
    }
  }
}
