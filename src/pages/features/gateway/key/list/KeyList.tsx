import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AuthGuard,
  access,
} from "../../../../../components/gateway/auth-guard";
import RenderList from "../../../../../components/gateway/list/RenderList";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../../store";
import { emptyState } from "../../../../../store/features/gateway/key/create/payload";
import {
  setFormErrors,
  setForms,
} from "../../../../../store/features/gateway/key/create/slice";
import { deleteKey } from "../../../../../store/features/gateway/key/delete/slice";
import {
  IKeyData,
  IKeyListState,
  IKeyDataList,
} from "../../../../../store/features/gateway/key/list";
import { getKeyList } from "../../../../../store/features/gateway/key/list/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

import statusAndDateHelper from "../../../../../utils/gateway/helper";

export default function KeyList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [DeleteKeyId, SetDeleteKeyId] = useState<string>();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const keyList: IKeyListState = useAppSelector(
    (state: RootState) => state.keyListState
  );
  const failure: any = () => ToastAlert(keyList.error!, "error");
  const [datalist, setDataList] = useState<IKeyDataList>({
    list: [],
    fields: [],
  });
  const mainCall = (currentPage: number, pageSize: number) => {
    dispatch(getKeyList({ currentPage, pageSize }));
  };
  useEffect(() => {
    // console.log("UseEffect", keyList.data);
    if (keyList.data && keyList.data?.Keys?.length > 0) {
      const listKey: IKeyData[] = [];
      for (const item of keyList.data?.Keys) {
        const key = statusAndDateHelper(item);
        listKey.push(key);
      }
      setDataList({
        list: [...listKey],
        fields: ["Id", "KeyName", "Status", "CreatedDateTxt"],
      });
    }
  }, [keyList.data]);

  useEffect(() => {
    mainCall(1, 4);
  }, []);

  const handlePageClick = (pageSelected: number) => {
    mainCall(pageSelected, 4);
    setSelected(pageSelected);
  };

  const searchFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1, 4);
  };
  const NavigateCreateKey = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    dispatch(setForms(emptyState.data.form));
    dispatch(setFormErrors(emptyState.data.errors));
    navigate("/gateway/keys/create");
  };

  const NavigateUpdate = (val: IKeyData) => {
    if (val.Id) {
      dispatch(setForms(emptyState.data.form));
      dispatch(setFormErrors(emptyState.data.errors));
      navigate(`/gateway/keys/update/${val.Id}`);
    }
  };
  //   const handleUserDetails = (val: ITenantUserData) => {
  //     console.log(val);
  //     // navigate("/userdetails");
  //     navigate(`/userdetails/${val.id}`, { state: { ...val } });
  //   };
  function deleteKeyFromState(id: string) {
    const newState = datalist.list.filter((item) => item.Id !== id);
    // console.log(newState);
    const pageCount = keyList.data?.TotalCount;
    if (newState.length === 0 && pageCount !== 1) {
      mainCall(selected - 1, 4);
      setSelected(selected - 1);
    } else mainCall(selected, 4);

    setDataList({
      list: [...newState],
      fields: ["Id", "KeyName", "Status", "CreatedDateTxt"],
    });
  }
  const handleDelete = async (id: string) => {
    setShow(false);
    console.log("delete clicked", id);
    const result = await dispatch(deleteKey(id));

    if (result.meta.requestStatus === "rejected") {
      await ToastAlert(result.payload.message, "error");
    } else {
      deleteKeyFromState(id);
      await ToastAlert("Key Deleted Successfully", "success");
    }

    //  if(ClickedTabIndex!==)
  };
  const handleCancel = () => setShow(false);

  const deleteKeyFunction = (val: IKeyData) => {
    if (val.Id) {
      setShow(true);
      SetDeleteKeyId(val.Id);
    }
  };
  const headings = [
    { title: "Key ID" },
    { title: "Key Name" },
    { title: "Status" },
    { title: "Created Date" },
  ];
  const actions = [];
  const editAction = {
    className: "btn btn-sm btn-light",
    iconClassName: "bi bi-pencil-square menu-icon",
    buttonFunction: NavigateUpdate,
  };
  const delAction = {
    className: "btn btn-sm btn-light",
    iconClassName: "bi bi-trash-fill menu-icon",
    // buttonFunction: () => setDeleteshow(true),
    buttonFunction: deleteKeyFunction,
  };
  const isViewAuthorized = AuthGuard({
    resource: access.resources.Key,
    scope: access.scopes.view,
  });
  if (isViewAuthorized) {
    actions.push(editAction);
  }
  const isDelAuthorized = AuthGuard({
    resource: access.resources.Key,
    scope: access.scopes.Delete,
  });
  if (isDelAuthorized) {
    actions.push(delAction);
  }

  if (isViewAuthorized || isDelAuthorized) {
    headings.push({ title: "Action" });
  }
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        {keyList.loading ? (
          <Spinner />
        ) : keyList.error ? (
          <div>{failure()}</div>
        ) : (
          <div className="card">
            <Modal show={show} onHide={handleCancel} centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete Key</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this Key ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="btn-danger"
                  onClick={() => handleDelete(DeleteKeyId!)}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            <div
              className="card-header mt-4 mb-3 bg-white"
              style={{ padding: "0.5rem 2.5rem" }}
            >
              <div className="align-items-center">
                <div>
                  <AuthGuard
                    resource={access.resources.Key}
                    scope={access.scopes.Create}
                  >
                    <button
                      className=" btn  btn-success btn-sm d-flex float-right mb-4"
                      onClick={(e) => NavigateCreateKey(e)}
                    >
                      {" "}
                      Create Key &nbsp;
                      <span className="bi bi-plus-lg"></span> &nbsp;
                    </button>
                  </AuthGuard>
                  <h5>
                    <b>KEY LIST</b>
                  </h5>
                </div>
              </div>
            </div>
            <div className="card-body pt-4">
              <div className="align-items-center">
                <div className="search-field justify-content-around">
                  <form className="h-50">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-parent border-1"
                        placeholder="Search Key"
                        // onChange={(e) => setSearch(e.target.value)}
                      />
                      <button
                        className=" btn  btn-success btn-sm"
                        onClick={(e) => searchFilter(e)}
                      >
                        <i className=" bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              {keyList.loading && <Spinner />}
              <div className="table-responsive">
                {!keyList.loading && keyList.data && (
                  <RenderList
                    headings={headings}
                    data={datalist}
                    actions={actions}
                    handlePageClick={handlePageClick}
                    pageCount={keyList.data.TotalCount}
                    selected={selected}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
