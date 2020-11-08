import Domain from "../Domain";
import Lecture from "./Lecture";


export default interface LectureContent extends Domain {
	addLecture(lecuture:Lecture):void	
}

export { LectureContent }