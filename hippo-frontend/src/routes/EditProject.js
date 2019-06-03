import React, { useCallback } from "react";

import SidePanel from "components/SidePanel";
import EditProjectSheetContents from "components/EditProject/index.js";

const EditProject = ({ history, match: { params } }) => {
  const closeHandler = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <SidePanel onClose={closeHandler} title="Edit Project" closeOnEsc={false}>
      <EditProjectSheetContents
        projectId={params.projectId}
        onClose={closeHandler}
      />
    </SidePanel>
  );
};

export default EditProject;
