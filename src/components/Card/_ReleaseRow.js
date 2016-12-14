// @flow

import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import BranchRow from './_BranchRow';
import Themable from '../hoc/Themable';
import TransparentTextOverlay from '../TransparentTextOverlay';

import {
  CardText,
  ContentRow,
  FullView,
  HighlightContainerRow1,
  LeftColumn,
  MainColumn,
  RepositoryContentContainer,
  Text,
} from './';

import { contentPadding, radius } from '../../styles/variables';
import { trimNewLines } from '../../utils/helpers';
import type { GithubEventType, ReleaseEvent, ThemeObject } from '../../utils/types';

@Themable
export default class extends React.PureComponent {
  props: {
    narrow: boolean,
    release: ReleaseEvent,
    theme?: ThemeObject,
    type: GithubEventType,
  };

  render() {
    const { narrow, release, theme, type } = this.props;

    if (type !== 'ReleaseEvent' || !release) return null;

    const {
      body,
      branch,
      name,
      tagName,
    } = {
      body: trimNewLines(release.get('body')),
      branch: release.get('target_commitish'),
      name: trimNewLines(release.get('name')),
      tagName: trimNewLines(release.get('tag_name')),
    };

    return (
      <View>
        {
          branch &&
          <BranchRow branch={branch} type={type} narrow />
        }

        <ContentRow narrow={narrow}>
          <LeftColumn />

          <MainColumn>
            <HighlightContainerRow1>
              <FullView>
                <TransparentTextOverlay
                  color={theme.base01}
                  size={contentPadding}
                  from="right"
                  radius={radius}
                >
                  <RepositoryContentContainer>
                    <Text numberOfLines={1}>
                      <Icon name="tag" />&nbsp;
                      {name || tagName}
                    </Text>
                  </RepositoryContentContainer>
                </TransparentTextOverlay>
              </FullView>
            </HighlightContainerRow1>
          </MainColumn>
        </ContentRow>

        {
          body &&
          <ContentRow narrow={narrow}>
            <LeftColumn />

            <MainColumn>
              <HighlightContainerRow1>
                <TransparentTextOverlay
                  color={theme.base01}
                  size={contentPadding}
                  from="right"
                  radius={radius}
                >
                  <RepositoryContentContainer>
                    <CardText numberOfLines={1}>
                      <Icon name="megaphone" />&nbsp;
                      {body}
                    </CardText>
                  </RepositoryContentContainer>
                </TransparentTextOverlay>
              </HighlightContainerRow1>
            </MainColumn>
          </ContentRow>
        }
      </View>
    );
  }
}