import {
    observable,
    makeAutoObservable,
    action,
    computed,
    runInAction,
} from 'mobx';
import { autobind } from 'core-decorators';
import { Lecture } from '@interface/domain/Lecture';
import LectureRepository from '@client/repository/LectureRepository';

@autobind
export class LectureStore {
    @observable
    private lecture_list: Array<Lecture> = [];
    @observable
    private lecuter_hierarky: Array<Lecture> = [];
    private lecutre_repository: LectureRepository;

    constructor(lecutre_repository: LectureRepository) {
        this.lecutre_repository = lecutre_repository;
        makeAutoObservable(this);
    }

    @action
    async loadList(skip: number, take: number) {
        const lectures = await this.lecutre_repository.fetchLectureList(
            skip,
            take
        );
        runInAction(() => {
            if (skip == 0) this.lecture_list = lectures;
            else this.lecture_list = this.lecture_list.concat(lectures);
        });
    }
    @computed
    getList() {
        return this.lecture_list;
    }

    @action
    async loadHierarky() {
        const lecture_hierarky = await this.lecutre_repository.fetchLectureHierarky();
        runInAction(() => {
            this.lecuter_hierarky = lecture_hierarky;
        });
    }
    @computed
    getHierarky() {
        return this.lecuter_hierarky;
    }
}

export default LectureStore;
