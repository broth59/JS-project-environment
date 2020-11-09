import Lecture from '@domain/Lecture/Lecture';
import LectureEntity from '@interface/entity/LectureEntity';
import LectureContentEntity from '@interface/entity/LectureContentEntity';
import LectureContent from './LectureContent';

export default class DefaultLecture implements Lecture {
    private upper_lecture?: Lecture;
    private child_lecturs: Array<Lecture> = [];
    private lecture_content?: LectureContent;

    private lecture_entity: LectureEntity;

    constructor(lecture_entity: LectureEntity, upper_lecture?: Lecture) {
        this.lecture_entity = lecture_entity;
        this.upper_lecture = upper_lecture;

        const childs = lecture_entity.child_lectures;

        if (childs) {
            this.child_lecturs = childs!.map(
                (child) => new DefaultLecture(child, this)
            );
        }
    }

    getEntity(): LectureEntity {
        return this.lecture_entity;
    }
}

export { DefaultLecture };
