import { ref } from "vue";
import { useCommonStoreHook } from "@/store/modules/common";

export function useColumns(props: any) {
  const curId = ref(1);
  const dataList = ref(props.modelValue);

  const columns: TableColumnList = [
    {
      label: "挂载目录",
      prop: "name",
      slot: "name"
    },
    {
      label: "挂载点",
      prop: "hobby",
      cellRenderer: ({ row, index }) => (
        <el-input disabled={index < 2} v-model={row.point} />
      )
    },
    {
      label: "操作",
      fixed: "right",
      width: 90,
      slot: "operation"
    }
  ];

  let id = 2;

  function onAdd() {
    dataList.value.push({
      id: ++id,
      name: "",
      point: ""
    });
  }

  function openFile(row, disable?) {
    if (disable) return;
    curId.value = row.id;
    useCommonStoreHook().toggleShowFileChoose(true);
  }

  function updataList(path) {
    console.log(curId.value, path);
    const index = dataList.value.findIndex(item => item.id === curId.value);
    if (index !== -1) dataList.value[index].name = path;
    useCommonStoreHook().toggleShowFileChoose(true);
  }

  function onDel(row) {
    const index = dataList.value.indexOf(row);
    if (index !== -1) dataList.value.splice(index, 1);
  }

  return {
    curId,
    columns,
    dataList,
    onAdd,
    updataList,
    openFile,
    onDel
  };
}
