export interface UserResponse {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	banner: string | null;
	accent_color: string | null;
	global_name: string;
	avatar_decoration_data: string | null;
	banner_color: string | null;
	clan: string | null;
}

export interface MessageSearchResponse {
	analytics_id: string;
	doing_deep_historical_index: boolean;
	total_results: number;
	results: [];
}

export interface UserReturn {
	disc_id: string;
	username: string;
	avatar: string;
	total_message_count: number;
	created_at: Date;
}
