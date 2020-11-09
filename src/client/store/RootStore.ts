import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { UIStore } from './UI/UIStore';
import { LectureStore } from '@store/Lecture/LectureStore';

@autobind
export class RootStore {
    ui_store: UIStore;
    user_store: any; //UserStore
    lecture_store: LectureStore;
    assignment_store: any; //AssignmentStore

    constructor({
        ui_store,
        user_store,
        lecture_store,
        assignment_store,
    }: RootStore) {
        this.ui_store = ui_store;
        this.user_store = user_store;
        this.lecture_store = lecture_store;
        this.assignment_store = assignment_store;
    }
}

export default RootStore;

export type TStore = RootStore; //ReturnType<typeof createStore>;
