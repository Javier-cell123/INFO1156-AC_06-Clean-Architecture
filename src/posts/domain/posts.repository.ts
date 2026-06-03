import { Post } from "./post.entity"

export interface PostsRepository {
    create(data: {
        title: string
        content: string
        authorId: string
    }): Promise<Post>
    findById(id: string): Promise<Post | null>
    findAll(): Promise<Post[]>
}
