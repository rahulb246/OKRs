import { useEffect, useState, useCallback, useRef } from "react";
import invokeRestApi from "../../utils/serviceBroker";
import Tree from "../Tree";
import Dropdown from "../Dropdown";
import Spinner from "../Spinner";
import { OKRs_GET_URL, CATEGORIES } from "../../utils/constants";
import objArrToTree from "../../utils/treeBuilder";

const OKRs = () => {
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const okrResponse = useRef(null);

  const treeConfig = {
    key: "id",
    parent: "parent_objective_id"
  };

  useEffect(() => {
    invokeRestApi(OKRs_GET_URL).then((response) => {
      const okrArr = response.data.data;
      okrResponse.current = okrArr;
      setOkrs(
        Object.values(
          objArrToTree(JSON.parse(JSON.stringify(okrArr)), treeConfig)
        )
      );
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOKRs = useCallback((filter) => {
    if (filter === "Show All") {
      setOkrs(
        Object.values(
          objArrToTree(
            JSON.parse(JSON.stringify(okrResponse.current)),
            treeConfig
          )
        )
      );
    } else {
      const filteredOKRs = okrResponse.current.filter(
        (okr) => okr.category === filter
      );
      setOkrs(
        Object.values(
          objArrToTree(JSON.parse(JSON.stringify(filteredOKRs)), treeConfig)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dropdown
        label="Filter: "
        onChange={(val) => filterOKRs(val)}
        values={CATEGORIES}
        initialValue="Show All"
      />
      {loading && <Spinner />}
      <Tree data={okrs} />
    </>
  );
};

export default OKRs;
