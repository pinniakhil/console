import React, { FormEvent, useEffect } from "react";
import { Tab, Tabs, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  AuthGuard,
  access,
} from "../../../../../components/gateway/auth-guard";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IApiGetByIdState } from "../../../../../store/features/gateway/api/update";
import {
  updateApi,
  getApiById,
  setForm,
} from "../../../../../store/features/gateway/api/update/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import AdvancedOptions from "./advanced-options/AdvancedOptions";
import Setting from "./setting/Setting";
import Version from "./version/Version";

export default function Update() {
  const state: IApiGetByIdState = useAppSelector(
    (RootState) => RootState.updateApiState
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getApiById(id));
  }, []);

  const navigate = useNavigate();
  async function setKey(a: any) {
    dispatch(
      setForm({
        ...state.data.form,
        SelectedTabIndex: a,
      })
    );
  }

  async function handleSubmitApiUpdate(event: FormEvent) {
    event.preventDefault();

    let validateObj1: any;
    let validateObj2: any;
    let versionVal = false;

    if (state.data.errors !== undefined) {
      const obj = state.data.errors;
      const { Versions, ...rest } = obj;

      validateObj1 = Object.values(rest).every((x) => x === null || x === "");

      for (const Version_ of Versions) {
        if (Version_.OverrideTarget === "") {
          validateObj2 = true;
        } else {
          validateObj2 = false;
          break;
        }
      }
    }
    const validateMTLs =
      state.data.form.EnableMTLS === true &&
      state.data.form.CertIds.length === 0;
    const validateLoad =
      state.data.form.EnableRoundRobin === true &&
      state.data.form.LoadBalancingTargets.length === 0;
    console.log("val", validateLoad);

    if (
      state.data.form.IsVersioningDisabled === false &&
      (state.data.form.VersioningInfo.Location === 0 ||
        state.data.form.VersioningInfo.Key === "")
    ) {
      versionVal = true;
    }

    if (
      validateObj1 &&
      validateObj2 &&
      !validateMTLs &&
      !validateLoad &&
      !versionVal
    ) {
      const newForm = { ...state.data.form };
      if (state.data.form.EnableRoundRobin === false) {
        newForm.LoadBalancingTargets = [];
        dispatch(setForm({ ...state.data.form, LoadBalancingTargets: [] }));
      }

      const result = await dispatch(updateApi(newForm));
      if (result.meta.requestStatus === "rejected") {
        ToastAlert(result.payload.message, "error");
      } else if (result.meta.requestStatus === "fulfilled") {
        ToastAlert("Api Updated Successfully!!", "success");
      } else {
        ToastAlert("Api Updated request is not fulfilled!!", "error");
      }
    } else {
      if (validateMTLs === true) {
        ToastAlert(
          "MTLS is enable. Please select atleast one certificate! ",
          "error"
        );
      }
      if (versionVal === true) {
        ToastAlert(
          "Version Data Location and Version Name both fields are required! ",
          "error"
        );
      }
      if (validateObj1 === false || validateObj2 === false) {
        ToastAlert("Please fill all the fields correctly! ", "error");
      }
      if (validateLoad === true) {
        ToastAlert(
          "Round-Robin Load Balancing is enable. Please add atleast one TargetUrl! ",
          "error"
        );
      }
    }
  }
  const NavigateToApisList = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/gateway/apis");
  };
  return (
    <div>
      {state.loading ? (
        <Spinner />
      ) : (
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div>
              <Form
                onSubmit={(e: FormEvent) => handleSubmitApiUpdate(e)}
                data-testid="form-input"
              >
                <div className="align-items-center">
                  <div
                    className="card-header bg-white mt-3 pt-1 pb-4"
                    style={{ padding: "0.5rem 1.5rem" }}
                  >
                    <AuthGuard
                      resource={access.resources.Api}
                      scope={access.scopes.Edit}
                    >
                      <button className=" btn btn-sm btn-success btn-md d-flex float-right mb-3">
                        {" "}
                        Update
                      </button>
                    </AuthGuard>
                    <button
                      className=" btn  btn-sm btn-light btn-md d-flex float-right mb-3"
                      onClick={(e) => NavigateToApisList(e)}
                    >
                      {" "}
                      Cancel
                    </button>
                    <span>
                      <b>UPDATE API</b>
                    </span>
                  </div>
                  <div className="card-body pt-2">
                    <Tabs
                      defaultActiveKey={state.data.form?.SelectedTabIndex}
                      id="uncontrolled-tab"
                      // transition={false}
                      className="mb-2 small"
                      onSelect={(k) => setKey(k)}
                    >
                      <Tab eventKey="setting" title="Setting">
                        <Setting />
                      </Tab>
                      <Tab eventKey="version" title="Version">
                        <Version />
                      </Tab>
                      <Tab eventKey="advanced-options" title="Advanced Options">
                        <AdvancedOptions />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
