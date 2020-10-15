<template>
<div>
  <a-select
    show-search
    :value="value"
    placeholder="input search text"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    @search="handleSearch"
    @change="handleChange"
  >
    <a-select-option v-for="d in data" :key="d.value">
      {{ d.text }}
    </a-select-option>
  </a-select>
  <p>{{value}}</p>
</div>
</template>
<script>


let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
   
  }

  timeout = setTimeout(fake, 300);
}
export default {
  data() {
    return {
      data: [{text:"444",value:'1'},{text:"555",value:'2'}],
      value: undefined,
    };
  },
  methods: {
    handleSearch(value) {
      console.log(value)//这里执行异步

    },
    handleChange(value) {
      console.log('222');
      this.value = value;
    },
  },
};
</script>