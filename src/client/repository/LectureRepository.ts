import { ApolloClient, gql } from '@apollo/client';
import { Inject } from 'typescript-ioc';
import { Lecture, LectureFactory } from '@interface/domain/Lecture';
import LectureEntity from '@interface/entity/LectureEntity';

export class LectureRepository {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async fetchLectureList(
        skip: number,
        take: number
    ): Promise<Array<Lecture>> {
        const { data, error } = await this.client.query({
            query: gql`
                query fetchLectures($skip: Float, $take: Float) {
                    lectures(skip: $skip, take: $take) {
                        content_no
                        content_title
                        content_outline
                        content_regist_date
                        lecture_content {
                            content_no
                            contents
                        }
                    }
                }
            `,
            variables: { skip, take },
        });

        const result: Array<LectureEntity> = error ? [] : data.lectures;
        return result.map((entity) =>
            LectureFactory.create({ lecture_entity: entity })
        );
    }

    async fetchLectureHierarky() {
        const { data, error } = await this.client.query({
            query: gql`
				lecturesHierarky {
					content_no
					content_title
					content_outline
					content_regist_date
					lecture_content {
						content_no
						contents
					}
					child_lectures {
						content_no
						content_title
						content_outline
						content_regist_date
						lecture_content {
							content_no
							contents
						}
						child_lectures {
							content_no
							content_title
							content_outline
							content_regist_date
							lecture_content {
								content_no
								contents
							}
						}
					}
				}
            `,
        });

        const result: Array<LectureEntity> = error ? [] : data.lectures;
        return result.map((entity) =>
            LectureFactory.create({ lecture_entity: entity })
        );
    }
}

export default LectureRepository;
