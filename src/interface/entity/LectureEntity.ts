import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import LectureContentEntity from './LectureContentEntity';

@Entity({ name: 'TB_LECTURE_MASTER' })
@ObjectType()
export default class LectureEntity {
    @PrimaryColumn({ name: 'CONTENT_NO' })
    @Field(() => ID, { nullable: true })
    content_no?: number;

    @ManyToOne(() => LectureEntity, (lecture) => lecture.content_no)
    @Field(() => LectureEntity)
    upper_content_no?: LectureEntity;

    @Column({ name: 'CONTENT_TITLE' })
    @Field(() => String)
    content_title?: string;

    @Column({ name: 'CONTENT_REGIST_DATE' })
    @Field(() => String)
    content_regist_date?: string;

    @Column({ name: 'TITLE_IMAGE_PATH', nullable: true })
    @Field(() => String)
    title_image_path?: string;

    @Column({ name: 'CONTENT_OUTLINE', nullable: true })
    @Field(() => String)
    content_outline?: string;

    @OneToOne(
        () => LectureContentEntity,
        (lecture_content) => lecture_content.content_no
    )
    @Field(() => LectureContentEntity)
    lecture_content?: LectureContentEntity;

    constructor(data?: LectureEntity) {
        if (data) {
            this.content_no = data.content_no;
            this.upper_content_no = data.upper_content_no;
            this.content_title = data.content_title;
            this.title_image_path = data.title_image_path;
            this.content_regist_date = data.content_regist_date;
            this.content_outline = data.content_outline;
            this.lecture_content = data.lecture_content;
        }
    }

    static of<T extends LectureEntity & { [index: string]: any }>(
        lecture_entity: T
    ) {
        const lecture = new LectureEntity({
            content_no: lecture_entity.content_no,
            title_image_path: lecture_entity.title_image_path,
            content_outline: lecture_entity.content_outline,
            content_regist_date: lecture_entity.content_regist_date,
            content_title: lecture_entity.content_title,
        });

        const upper_content_no = lecture_entity.upper_content_no;
        if (upper_content_no && typeof upper_content_no === 'number') {
            lecture.upper_content_no = new LectureEntity({
                content_no: upper_content_no,
            });
        }

        return lecture;
    }
}

export { LectureEntity };

@InputType()
export class LectureInput {
    @Field(() => Number)
    upper_content_no?: number;

    @Field(() => String)
    content_title?: string;

    @Field()
    content_regist_date?: string;

    @Field(() => String)
    title_image_path?: string;

    @Field(() => String)
    content_outline?: string;
}
