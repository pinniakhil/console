import React from "react";
import { Accordion, AccordionButton } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../components/toast-alert/toast-alert";
import { getApiById } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  setForm,
  setFormError,
} from "../../../../../../../store/features/gateway/policy/create/slice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../store/hooks";
import ApiAccessList from "../../../../common-settings/api-access-List/ApiAccessList";

export default function AccessList() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const dispatch = useAppDispatch();

  const handleAddClick = async (Id: string) => {
    const data = state.data.form.APIs?.some((x) => x?.Id === Id);

    if (!data) {
      const selectedApi = await dispatch(getApiById(Id));
      if (
        selectedApi.payload.Data.ApiId === Id &&
        selectedApi.payload.Data.AuthType !== "keyless"
      ) {
        const listV: string[] = [];
        for (const element of selectedApi.payload.Data.Versions) {
          listV.push(element.Name);
        }

        const list = [
          ...state.data.form.APIs,
          {
            Id: selectedApi.payload.Data.ApiId,
            Name: selectedApi.payload.Data.Name,
            Versions: [],
            MasterVersions: listV,
            AuthType: selectedApi.payload.Data.AuthType,
            isRateLimitDisabled: selectedApi.payload.Data.RateLimit.IsDisabled,
            isQuotaDisbaled: selectedApi.payload.Data.IsQuotaDisabled,
            AllowedUrls: [],
            Limit: {
              rate: -1,
              per: -1,
              throttle_interval: -1,
              throttle_retry_limit: -1,
              max_query_depth: -1,
              quota_max: -1,
              quota_renews: -1,
              quota_remaining: -1,
              quota_renewal_rate: -1,
              set_by_policy: false,
            },
          },
        ];
        const error = [...state.data.errors?.PerApiLimit!];
        const perapierror = {
          ApiId: selectedApi.payload.Data.ApiId,
          Per: "",
          Rate: "",
          Quota: "",
          Expires: "",
          QuotaRenewalRate: "",
          ThrottleInterval: "",
          ThrottleRetries: "",
        };
        error.push(perapierror);
        dispatch(
          setFormError({
            ...state.data.errors,
            PerApiLimit: error,
          })
        );
        dispatch(
          setForm({
            ...state.data.form,
            APIs: list,
          })
        );
      } else {
        window.alert(
          "Rate limits, throttling, quota settings and path-based permissions have no effect on Open (Keyless) API ...."
        );
      }
    } else {
      ToastAlert("Already select...", "error");
    }
  };

  return (
    <>
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <AccordionButton>Add API Access Rights</AccordionButton>

            <Accordion.Body>
              <ApiAccessList state={state} handleAddClick={handleAddClick} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}
