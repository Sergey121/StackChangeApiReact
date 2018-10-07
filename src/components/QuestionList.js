import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import QuestionService from '../services/QuestionService';
import Modal from './Modal';

class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.service = new QuestionService();

        this.state = {
            questions: [],
            details: null,
            showModal: false,
            hasMore: true,
            params: {
                pagesize: 50,
            }
        };
    }

    getQuestions(page) {
        const params = Object.assign({}, this.state.params, {page});
        this.service.getAll(params)
            .then(response => {
                const {questions} = this.state;
                this.setState({
                    questions: questions.concat(response.items),
                    hasMore: response.has_more,
                });
            });
    }

    onDetails(question) {
        this.service.get(question.question_id)
            .then(data => {
                this.setState({
                    showModal: true,
                    details: data.items[0],
                });
            });

    }

    render() {
        const items = this.state.questions;

        let modalComponent = null;
        if (this.state.showModal) {
            modalComponent = <Modal
                details={this.state.details}
                onClose={() => this.setState({showModal: false})}/>
        }

        return (
            <div className="scroll-container">
                <InfiniteScroll
                    pageStart={0}
                    hasMore={this.state.hasMore}
                    loadMore={(page) => {
                        this.getQuestions(page);
                    }}>
                    <table>
                        <thead>
                        <tr>
                            <th>Автор</th>
                            <th>Заголовок</th>
                            <th>Дата создания</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => {
                            const date = new Date(item.creation_date * 1000);
                            return (
                                <tr key={index} onClick={() => this.onDetails(item)}>
                                    <td>{item.owner.display_name}</td>
                                    <td>{item.title}</td>
                                    <td>{date.toLocaleString('en-US')}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </InfiniteScroll>
                {modalComponent}
            </div>
        )
    }
}

export default QuestionList;
