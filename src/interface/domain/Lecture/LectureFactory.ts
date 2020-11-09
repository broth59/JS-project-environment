import DefaultLecture from './DefaultLecture';
import LectureEntity from '@interface/entity/LectureEntity';
import LectureContentEntity from '@interface/entity/LectureContentEntity';

type LecturefactoryParameter = {
    type?: string;
    lecture_entity: LectureEntity;
};

export class LectureFactory {
    static create({ type, lecture_entity }: LecturefactoryParameter) {
        switch (type) {
            default:
                return new DefaultLecture(lecture_entity);
        }
    }
}

export default LectureFactory;
