import type {
    StrategyOptions,
} from 'passport-twitch-latest';

export type TwitchAuthModuleOptions = {
    [K in keyof StrategyOptions]: StrategyOptions[K];
};
export const twitchGuardDefaultOptions = {
    scope: ['user_read'],
    state: true,
};

export interface TwitchAuthModuleOptionsFactory {
    createModuleOptions: () => | Promise<TwitchAuthModuleOptions>
        | TwitchAuthModuleOptions;
}

export interface TwitchProfile {
    accessToken: string;
    broadcaster_type: string;
    created_at: string;
    description: string;
    display_name: string;
    email: string;
    id: string;
    login: string;
    offline_image_url: string;
    profile_image_url: string;
    provider: string;
    refreshToken: string;

    type: string;
    view_count: number;
}

export interface TwitchAuthResult {
    accessToken: string;
    profile: TwitchProfile;
    refreshToken: string;
}