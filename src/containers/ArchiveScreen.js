import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
import ArchiveContainer from '../Components/FullComponents/ArchiveContainer';
import { newEmptyBreakdown, fetchUserProjects, createNewBreakdown, putInArchive, fetchUserArchiveProjects, fetchBreakdowns } from '../Redux/Actions';
import { startRefresh, finishRefresh } from '../Redux/Actions/RefreshActions';
import Header from '../Components/CommonComponents/Header';

class ArchiveScreen extends React.Component {

  componentWillMount() {
    this.props.fetchUserArchiveProjects();
    // this.props.inArchiveScreen(); //sets comingFromArchive to true
  }

  render() {
    const onFolderClick = (projectInfo) => {
      //action creator
      this.props.fetchBreakdowns(projectInfo);
      console.log('WE GOT HERE WOWOHLFKDSJL');
      console.log(this.props);
      this.props.navigation.navigate('ProjectBreakdowns');
    };

    const goToBreakdownPreviewScreen = () => {
      this.props.newEmptyBreakdown();
      this.props.navigation.navigate('EditBreakdown');
    };

    return (
        <ArchiveContainer
          projects={this.props.projects}
          onFolderClick={(projectInfo) => { onFolderClick(projectInfo); }}
          refreshing={this.props.refreshing}
          startRefresh={() => this.props.startRefresh()}
          finishRefresh={() => this.props.finishRefresh()}
        />
    );
  }
}

const mapStateToProps = (state) => {
  const projects = _.map(state.data.projects, (val, uid) => {
    return { ...val, uid };
  });
  return { projects, refreshing: state.refresh.refreshing };
};

const mapDispatchToProps = () => {
  return {fetchUserArchiveProjects,
  fetchBreakdowns,
  startRefresh,
  finishRefresh,
  newEmptyBreakdown}
}

export default connect(mapStateToProps, {
  fetchUserArchiveProjects,
  fetchBreakdowns,
  startRefresh,
  finishRefresh,
  newEmptyBreakdown, })(ArchiveScreen);
