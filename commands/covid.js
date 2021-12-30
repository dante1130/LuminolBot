const { MessageEmbed } = require("discord.js");
const covid = require("covid19-api");


module.exports = {
    name: 'covid',
    description: 'shows covid info',

    execute(message, args) {
        const embed = new MessageEmbed();
        if (!args[0]) {
            covid.getReports().then((result) => {
                embed.setTitle(`COVID19 Statistics`)
                    .setColor('#00FFFF')
                    .addFields(
                        {
                            name: 'Country',
                            value: "Worldwide",
                            inline: false
                        },
                        {
                            name: 'Active cases',
                            value: result[0][0].active_cases[0].currently_infected_patients.toString(),
                            inline: false
                        },
                        {
                            name: 'Cases',
                            value: result[0][0].cases.toString(),
                            inline: true
                        },
                        {
                            name: 'Deaths',
                            value: result[0][0].deaths.toString(),
                            inline: true
                        },
                        {
                            name: 'Recovered',
                            value: result[0][0].recovered.toString(),
                            inline: true
                        });
                message.channel.send({ embeds: [embed] });
            });
        } else {
            covid.getReportsByCountries([args[0]]).then((result) => {
                embed.setTitle(`COVID19 Statistics`)
                    .setColor('#00FFFF')
                    .setImage(result[0][0].flag)
                    .addFields(
                        {
                            name: 'Country',
                            value: args[0],
                            inline: false
                        },
                        {
                            name: 'Active cases',
                            value: "Unavailable",
                            inline: false
                        },
                        {
                            name: 'Cases',
                            value: result[0][0].cases.toString(),
                            inline: true
                        },
                        {
                            name: 'Deaths',
                            value: result[0][0].deaths.toString(),
                            inline: true
                        },
                        {
                            name: 'Recovered',
                            value: result[0][0].recovered.toString(),
                            inline: true
                        });
                if (result[0][0].active_cases[0]) {
                    embed.fields[1].value = result[0][0].active_cases[0].currently_infected_patients.toString();
                }
                        
                message.channel.send({ embeds: [embed] });
            }).catch(err => {
                embed.setTitle(`COVID19 Statistics`)
                    .setColor('#FF0000')
                    .setDescription(`Country '${args[0]}' not found.`);
                message.channel.send({ embeds: [embed] });
                console.log(err);
            });
        }
    }
};