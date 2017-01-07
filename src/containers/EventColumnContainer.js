// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EventColumn from '../components/columns/EventColumn';

import {
  columnIsLoadingSelector,
  columnErrorsSelector,
  makeColumnSelector,
  makeColumnSubscriptionsSelector,
  makeDenormalizedOrderedColumnEventsSelector,
} from '../selectors';

import * as actionCreators from '../actions';
import type {
  ActionCreators,
  Column as ColumnType,
  GithubEvent,
  Subscription,
  State,
} from '../utils/types';

const makeMapStateToProps = () => {
  const columnSelector = makeColumnSelector();
  const columnSubscriptionsSelector = makeColumnSubscriptionsSelector();
  const denormalizedOrderedColumnEventsSelector = makeDenormalizedOrderedColumnEventsSelector();

  return (state: State, { columnId }: { columnId: string }) => ({
    column: columnSelector(state, { columnId }),
    errors: columnErrorsSelector(state, { columnId }),
    events: denormalizedOrderedColumnEventsSelector(state, { columnId }),
    subscriptions: columnSubscriptionsSelector(state, { columnId }),
    loading: columnIsLoadingSelector(state, { columnId }),
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

@connect(makeMapStateToProps, mapDispatchToProps)
export default class extends React.PureComponent {
  props: {
    actions: ActionCreators,
    column: ColumnType,
    errors: Array<string>,
    events: Array<GithubEvent>,
    loading: boolean,
    subscriptions: Array<Subscription>,
  };

  render() {
    const {
      actions,
      column,
      errors,
      events,
      loading,
      subscriptions,
      ...props
    } = this.props;

    return (
      <EventColumn
        key={`column-container-${column.get('id')}`}
        actions={actions}
        column={column}
        items={events}
        errors={errors}
        loading={loading}
        subscriptions={subscriptions}
        {...props}
      />
    );
  }
}