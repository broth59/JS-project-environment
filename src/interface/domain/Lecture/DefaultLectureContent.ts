import LectureContent from '@domain/Lecture/LectureContent';
import LectureContentEntity from '@interface/entity/LectureContentEntity';
import Lecture from './Lecture';

export default class DefaultLectureContent implements LectureContent {
    private lecture: Lecture;
    private lecture_content?: LectureContentEntity;

    constructor(lecture: Lecture, lecture_content?: LectureContentEntity) {
        this.lecture = lecture;
        this.lecture_content = lecture_content;
    }

    addLecture(lecture: Lecture) {
        this.lecture = lecture;
    }

    getEntity(): LectureContentEntity | undefined {
        return this.lecture_content;
    }
}

export { DefaultLectureContent };
