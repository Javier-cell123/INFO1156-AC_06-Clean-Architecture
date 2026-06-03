import { Like } from "./like.entity"

export interface LikesRepository {
    add(postId: string, userId: string): Promise<Like>
    remove(postId: string, userId: string): Promise<boolean>
    countByPostId(postId: string): Promise<number>
}
