index.js
const { Client, GatewayIntentBits, PermissionsBitField, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const commands = [
    {
      name: 'warn',
      description: 'تحذير عضو',
      options: [{ name: 'user', type: 6, description: 'العضو', required: true }]
    },
    {
      name: 'ban',
      description: 'حظر عضو',
      options: [{ name: 'user', type: 6, description: 'العضو', required: true }]
    },
    {
      name: 'addrole',
      description: 'إضافة رتبة',
      options: [
        { name: 'user', type: 6, description: 'العضو', required: true },
        { name: 'role', type: 8, description: 'الرتبة', required: true }
      ]
    },
    {
      name: 'removerole',
      description: 'إزالة رتبة',
      options: [
        { name: 'user', type: 6, description: 'العضو', required: true },
        { name: 'role', type: 8, description: 'الرتبة', required: true }
      ]
    },
    {
      name: 'ticket',
      description: 'إنشاء تذكرة دعم'
    }
  ];

  await client.application.commands.set(commands);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'warn') {
    const user = interaction.options.getUser('user');
    interaction.reply(`⚠️ تم تحذير ${user.tag}`);
  }

  if (interaction.commandName === 'ban') {
    const member = interaction.options.getMember('user');
    await member.ban();
    interaction.reply(`🚫 تم حظر ${member.user.tag}`);
  }

  if (interaction.commandName === 'addrole') {
    const member = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');
    await member.roles.add(role);
    interaction.reply(`✅ تم إضافة الرتبة`);
  }

  if (interaction.commandName === 'removerole') {
    const member = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');
    await member.roles.remove(role);
    interaction.reply(`❌ تم إزالة الرتبة`);
  }

  if (interaction.commandName === 'ticket') {
    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText
    });

    interaction.reply(`🎫 تم إنشاء التذكرة: ${channel}`);
  }
});

client.login(process.env.TOKEN);
