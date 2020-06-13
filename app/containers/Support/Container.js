import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormBuilder } from 'gg-components/FormBuilder';
import { Button } from 'gg-components/Button';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';

export default class Support extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadLinks();
    this.interval = setInterval(() => {
      this.props.loadLinks();
    }, 3000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const {
      user,
      links,
      loadLinks,
      loadingLinks,
      loadLinksSuccess,
      loadLinksError,
      addLink,
      addLinkLoading,
      addLinkSuccess,
      addLinkErrored,
      deleteLink,
      deleteLinkLoading,
      deleteLinkSuccess,
      deleteLinkError,
      className,
    } = this.props;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const noSupport = loadLinksSuccess && links && links.length === 0;
    const showLinks = links && links.length > 0;
    const isAdmin = user && user.admin;

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Helmet title="Support" />
        <PageTitle name="Support">
          <Button
            onClick={() => {
              loadLinks();
            }}
          >
            Refresh
          </Button>
          <br />
          <br />
          {noSupport && (
            <Paragraph>No support session is currently active.</Paragraph>
          )}
          {showLinks &&
            links.map(l => (
              <SubSection anchor={false} name={l.name || 'untitled'}>
                {l.url && (
                  <TextLink external href={l.url}>
                    {l.url}
                  </TextLink>
                )}
                {l.description && (
                  <>
                    <br />
                    {l.description}
                  </>
                )}
                {isAdmin && (
                  <>
                    <br />
                    <Button
                      destructive
                      onClick={() => {
                        deleteLink(l);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </SubSection>
            ))}
          {isAdmin && (
            <FormBuilder
              disabled={addLinkLoading}
              entity={this.state.newLink || {}}
              submitLabel="Add link"
              formFields={[
                { id: 'name', name: 'Name', show: true },
                { id: 'description', name: 'Description', show: true },
                { id: 'url', name: 'URL', show: true },
              ]}
              onDataChanged={newLink => {
                this.setState({ newLink });
              }}
              onSubmit={() => {
                addLink(this.state.newLink);
              }}
            />
          )}
        </PageTitle>
      </div>
    );
  }
}

Support.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Support.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};
