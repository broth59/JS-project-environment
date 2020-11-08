import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import LectureEntity from './LectureEntity';

@Entity({ name: 'TB_LECTURE_DETAIL' })
@ObjectType()
export default class LectureContentEntity {
    @JoinColumn({ name: 'CONTENT_NO' })
    @OneToOne(() => LectureEntity, (lecture) => lecture.content_no, {
        primary: true,
        onDelete: 'CASCADE',
    })
    @Field(() => ID)
    content_no?: LectureEntity;

    @Column({ name: 'CONTENTS', type: 'clob', nullable: true })
    @Field(() => String)
    contents?: string;

    constructor(data?: LectureContentEntity) {
        if (data) {
            this.content_no = data.content_no;
            this.contents = data.contents;
        }
    }

    static of<T extends LectureContentEntity & { [index: string]: any }>(
        lecture_content: T
    ) {
        const new_lecture_content = new LectureContentEntity({
            content_no: lecture_content.content_no,
            contents: lecture_content.contents,
        });
        return new_lecture_content;
    }
}

export { LectureContentEntity };

@InputType()
export class LectureContentInput implements Partial<LectureContentEntity> {
    @Field(() => String)
    contents?: string;
}
