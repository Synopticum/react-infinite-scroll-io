import React from 'react';
import ReactDOM from "react-dom";
import _ from "lodash";
import './style.css';

class InfiniteScroll extends React.Component {

    constructor(props) {
        super(props);

        this.scrollable = React.createRef();
        this.threshold = React.createRef();
    }

    componentDidMount() {
        this._initInfiniteScroll();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // reset page and scroll when user a changes a watch value
        // a watch value can be a primitive or an array of primitives
        if (this._hasPrimitiveChanged(prevProps) || this._hasArrayChanged(prevProps)) {
            this.page = 1;
            ReactDOM.findDOMNode(this).scrollTop = 0;
        }
    }

    render() {
        return (
            <div className="infinite-scroll">
                <div className="infinite-scroll__scroll" ref={this.scrollable}>
                    {!_.isEmpty(this.props.items) ? this.renderList(this.props.items) : <div className="infinite-scroll__error">{!(this.props.isFetching || this.props.isLoadingMore) ? this.props.errorMessage : ''}</div> }

                    <div className="infinite-scroll__threshold" ref={this.threshold}/>

                    <div className={`infinite-scroll__bottom ${(this.props.isFetching || this.props.isLoadingMore) || this.props.isLoadComplete ? 'infinite-scroll__bottom--hidden' : ''}`}/>

                    {this.props.isFetching || this.props.isLoadingMore ? this.props.spinner : ''}
                </div>
            </div>
        );
    }

    renderList(items) {
        return items.map(item => this.props.renderCallback(item));
    }

    _initInfiniteScroll() {
        this.page = 1;

        let intersectionObserver = new IntersectionObserver(entries => {
            // if intersectionRatio is 0, the threshold is out of view and we do not need to do anything
            if (entries[0].intersectionRatio <= 0) {
                return;
            }

            if (!this.props.isLoadComplete) {
                this.page++;
                this.props.loadMoreCallback(this.props.loadMoreParams, this.page);
            }
        });

        intersectionObserver.observe(this.threshold.current);
    }

    _hasPrimitiveChanged(prevProps) {
        return !_.isArray(this.props.resetStateIfValueChanged) && this.props.resetStateIfValueChanged !== prevProps.resetStateIfValueChanged;
    }

    _hasArrayChanged(prevProps) {
        return _.isArray(this.props.resetStateIfValueChanged) && !_.isEqual(this.props.resetStateIfValueChanged, prevProps.resetStateIfValueChanged);
    }
}

export default InfiniteScroll;
