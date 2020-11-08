import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { UIStore } from './UI/UIStore';

@autobind
export class RootStore {
    ui_store: UIStore;
    user_store: any; //UserStore
    lecture_store: any; //LectureStore
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

class Auto {
    @observable
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    async setName() {
        const client = new ApolloClient({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
            cache: new InMemoryCache(),
        });
        client
            .query({
                query: gql`
                    query GetRates {
                        rates(currency: "USD") {
                            currency
                        }
                    }
                `,
                variables: {},
            })
            .then((result) => console.log(result));
        this.name += '^tail';
    }
}

export type TStore = RootStore; //ReturnType<typeof createStore>;
