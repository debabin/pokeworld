import type { JwtService } from '@nestjs/jwt';

import { Injectable } from '@nestjs/common';

import type { User, UserService } from '@/modules/user';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(id: string) {
        const user = await this.usersService.findOne({ where: { id } });
        return user;
    }

    async login(user: User) {
        const payload = { username: user.username, id: user.id };

        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '30m' }),
            refresh_token: this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }),
        };
    }

    async refreshTokens(refreshToken: string) {
        const payload = this.jwtService.verify(refreshToken);

        const user = await this.usersService.findOne({ where: { id: payload.id } });

        if (!user) throw new Error('User not found');

        const newPayload = { username: user.username, id: user.id };

        return {
            access_token: this.jwtService.sign(newPayload, { expiresIn: '30m' }),
            refresh_token: this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }),
        };
    }
}