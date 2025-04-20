import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
    twitchGuardDefaultOptions,
} from './twitch.types';

@Injectable()
class TwitchAuthGuard extends AuthGuard('twitch') {
    constructor() {
        super({
            ...twitchGuardDefaultOptions,
            property: 'hybridAuthResult',
        });
    }
}

export const UseTwitchAuth = () => UseGuards(TwitchAuthGuard);