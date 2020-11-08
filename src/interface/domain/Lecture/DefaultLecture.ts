import Lecture from "@domain/Lecture/Lecture";
import LectureEntity from "@interface/entity/LectureEntity";
import LectureContentEntity from "@interface/entity/LectureContentEntity";
 

export default class DefaultLecture implements Lecture {
	private lecture:LectureEntity
	
	constructor(lecture_entity:LectureEntity){
		this.lecture = lecture_entity
	}

	getEntity():LectureEntity{
		return this.lecture
	}

}

export { DefaultLecture }