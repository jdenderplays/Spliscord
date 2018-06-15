import applyOptions from '../util/applyOptions';
import { Event } from 'klasa';
import { GuildMember, Role } from 'discord.js';

@applyOptions({
    name: 'joinRole',
    event: 'guildMemberAdd',
})
export default class extends Event {

    run(member: GuildMember) {

        if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
        
        const role = this.client.gateways.guilds.get(member.guild.id).get('joinrole') as Role;
        
        if (!role || !role.editable) return;

        member.roles.add(role, 'Join role');
    }

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        if (!schema.has('joinrole'))
            await schema.add('joinrole', { type: 'Role' });
    }
}