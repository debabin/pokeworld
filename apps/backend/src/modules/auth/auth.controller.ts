import { Controller, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { UserService } from '@/modules/user';

import { BaseResolver } from '@/shared';

import type { AuthService } from './auth.service';
import type { TwitchProfile } from './twitch';

import { UseJwtAuth } from './jwt';
import { UseTwitchAuth } from './twitch';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
        super();
    }

    @Get('/twitch')
    @UseTwitchAuth()
    twitchLogin() { }

    @Get('/twitch/callback')
    @UseTwitchAuth()
    async twitchCallback(@Req() request, @Res() response) {
        const profile = request.user as TwitchProfile;

        const user = await this.userService.findOne({ where: { externalId: profile.id } });

        const data = {
            authData: { provider: 'twitch', externalId: profile.id, data: profile },
            externalId: profile.id,
            username: profile.login,
            email: profile.email,
            avatar: profile.profile_image_url
        } as const

        if (!user) {
            await this.userService.insert(data);
        } else {
            await this.userService.update(user.id, data);
        }

        const token = await this.authService.login(user) as any;
        response.cookie('access_token', token.access_token, { httpOnly: true, secure: true, maxAge: 3600000 });
        response.cookie('refresh_token', token.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });

        return response.json(this.wrapSuccess({ user }))
    }

    @Get('/refresh')
    @UseJwtAuth()
    async refreshToken(@Req() request, @Res() response) {
        try {
            const refreshToken = request.cookies?.refresh_token;

            if (!refreshToken) throw new UnauthorizedException('Refresh token not found');

            const tokens = await this.authService.refreshTokens(refreshToken);

            response.cookie('access_token', tokens.access_token, { httpOnly: true, secure: true, maxAge: 3600000 });
            response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });

            return response.json(this.wrapSuccess());
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}