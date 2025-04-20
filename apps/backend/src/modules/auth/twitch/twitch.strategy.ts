import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-latest';

import type { TwitchProfile } from './twitch.types';

@Injectable()
export class TwitchAuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
            callbackURL: process.env.TWITCH_CALLBACK_URL
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: TwitchProfile,
    ) {
        return profile
    }
}