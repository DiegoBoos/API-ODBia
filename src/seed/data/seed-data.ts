interface SeedService {
    name: string
    rate: number
}

interface SeedData {
    services: SeedService[]
}

export const initialData: SeedData = {
    services: [
        {
            name: 'text',
            rate: 0.1,
        },
        {
            name: 'image',
            rate: 0.2,
        },
        {
            name: 'audio',
            rate: 0.3,
        },
        {
            name: 'video',
            rate: 0.4,
        },
    ]
}