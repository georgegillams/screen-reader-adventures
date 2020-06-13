import React from 'react';
import { Paragraph, TextLink, PageTitle } from 'gg-components/Typography';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './style.scss';
import apiStructure from './apiStructureWithDescriptions';

const getClassName = cssModules(STYLES);

const Container = () => (
  <PageTitle name="API docs">
    <table
      className={getClassName('api-docs__table')}
      cellSpacing="4"
      cellPadding="4"
    >
      <tr>
        <th>
          <Paragraph>Path</Paragraph>
        </th>
        <th>
          <Paragraph>Method</Paragraph>
        </th>
        <th>
          <Paragraph>Arguments</Paragraph>
        </th>
        <th>
          <Paragraph>Authorisation</Paragraph>
        </th>
        <th>
          <Paragraph>Description</Paragraph>
        </th>
      </tr>
      {Object.keys(apiStructure).map(key => {
        const apiCapability = apiStructure[key];
        return (
          <tr>
            <td>
              <TextLink href={apiCapability.fullPath} external>
                {apiCapability.path}
              </TextLink>
            </td>
            <td>
              <Paragraph className={getClassName('api-docs__method')}>
                {apiCapability.method}
              </Paragraph>
            </td>
            <td>
              <Paragraph>{apiCapability.arguments}</Paragraph>
            </td>
            <td>
              <Paragraph>{apiCapability.authorisation}</Paragraph>
            </td>
            <td>
              <Paragraph className={getClassName('api-docs__description')}>
                {apiCapability.description}
              </Paragraph>
            </td>
          </tr>
        );
      })}
    </table>
  </PageTitle>
);

export default Container;
