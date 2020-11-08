import { Resolver, Ctx, FieldResolver, Root } from "type-graphql";
import LectureEntity from "@interface/entity/LectureEntity";
import LectureContentEntity from "@interface/entity/LectureContentEntity";
import ResolverContext from "@server/graphql/type/ResolverContext";

@Resolver(() => LectureEntity)
export class LectureMasterResolver {
    @FieldResolver(() => LectureContentEntity, { nullable: true })
    async lecture_content(
        @Ctx() ctx: ResolverContext,
        @Root() lecture: LectureEntity
    ): Promise<LectureContentEntity | undefined> {
        const repository = ctx.db.getRepository(LectureContentEntity);
        const [lecture_content] = await repository.find({
            where: { content_no: lecture.content_no },
        });
        return lecture_content;
    }
}

export default LectureMasterResolver;
