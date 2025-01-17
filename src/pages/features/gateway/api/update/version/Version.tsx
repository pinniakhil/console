import React from "react";
import { Col, Form } from "react-bootstrap";
import {
  setForm,
  setFormError,
} from "../../../../../../store/features/gateway/api/update/slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import VersionSettings from "./version-settings/VersionSettings";
import Versions from "./versions/Versions";

export default function Version() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  console.log("version", state.data.form);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked === false) {
      const versionInfoList = {
        Location: 0,
        Key: "",
      };

      const list = [
        {
          Name: "Default",
          OverrideTarget: "",
          Expires: "",
          GlobalRequestHeaders: {},
          GlobalRequestHeadersRemove: [],
          GlobalResponseHeaders: {},
          GlobalResponseHeadersRemove: [],
          ExtendedPaths: undefined,
        },
      ];
      dispatch(
        setForm({
          ...state.data.form,
          IsVersioningDisabled: !event.target.checked,
          VersioningInfo: versionInfoList,
          Versions: list,
        })
      );

      const errlist = [
        {
          OverrideTarget: "",
        },
      ];

      dispatch(
        setFormError({
          ...state.data.errors,
          Versions: errlist,
        })
      );
    } else {
      dispatch(
        setForm({
          ...state.data.form,
          IsVersioningDisabled: !event.target.checked,
        })
      );
    }
  }

  return (
    <div>
      <Col md="12">
        <Form.Group className="ml-3 mb-3">
          <Form.Check
            type="switch"
            id="IsVersioningDisabled"
            name="IsVersioningDisabled"
            label="Enable Versioning"
            disabled={state.data.form.EnableRoundRobin}
            checked={!state.data.form?.IsVersioningDisabled}
            onChange={(e: any) => validateForm(e)}
          />
        </Form.Group>
      </Col>
      {state.data.form.EnableRoundRobin &&
      state.data.form?.IsVersioningDisabled ? (
        <h6>Note: Version doesn&apos;t works with Round-Robin LoadBalacing</h6>
      ) : (
        <></>
      )}

      {state.data.form?.IsVersioningDisabled ? (
        <></>
      ) : (
        <div>
          <VersionSettings />
          <Versions />
        </div>
      )}
    </div>
  );
}
