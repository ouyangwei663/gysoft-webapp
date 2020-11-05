<template>
  <div class="hello">
    <van-nav-bar
      title="日营业情况"
      :fixed="true"
      :left-arrow="true"
      right-text="来客登记"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="bank"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-collapse v-model="activeNames" class="banktimecenter">
      <van-collapse-item name="1" left>
        <template #title> 日期：{{ begindate }} 到 {{ enddate }} </template>
        <van-cell
          title="开始时间"
          is-link
          :value="begindate"
          @click="showtime = true"
        />
        <van-cell
          title="结束时间"
          is-link
          :value="enddate"
          @click="showendtime = true"
        />
        <van-popup v-model="showtime" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="handleEndDateConfirm"
            @cancel="showtime = false"
          />
        </van-popup>
        <van-popup v-model="showendtime" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="endhandleEndDateConfirm"
            @cancel="showendtime = false"
          />
        </van-popup>
      </van-collapse-item>
    </van-collapse>
    <div class="main">
      <v-touch
        @swipeleft="swipeLeft"
        :swipe-options="{ direction: 'horizontal' }"
        @swiperight="swipeRight"
      >
        <table class="chart">
          <tr class="charttitle">
            <td class="firstchart">分店</td>
            <td v-show="index == 1">日期</td>
            <td v-show="index == 1">日结</td>
            <td v-show="index == 1">总业绩</td>
            <td v-show="index == 2">产品金额</td>
            <td v-show="index == 2">售卡业绩</td>
            <td v-show="index == 2">劳动业绩</td>
            <td v-show="index == 3" colspan="4">
              <table class="secondchart">
                <tr>
                  <td colspan="4">会员首次充值</td>
                </tr>
                <tr>
                  <td>笔数</td>
                  <td>现金</td>
                  <td>银行</td>
                  <td>挂账</td>
                </tr>
              </table>
            </td>
            <td v-show="index == 4" colspan="4">
              <table class="secondchart">
                <tr>
                  <td colspan="4">会员续费充值</td>
                </tr>
                <tr>
                  <td>笔数</td>
                  <td>现金</td>
                  <td>银行</td>
                  <td>挂账</td>
                </tr>
              </table>
            </td>
            <td v-show="index == 5">前台损失</td>
            <td v-show="index == 5">店面费用</td>
            <td v-show="index == 5">应缴金额</td>
            <td v-show="index == 5">实缴金额</td>
            <td v-show="index == 6">男客数</td>
            <td v-show="index == 6">女客数</td>
            <td v-show="index == 6">指名数</td>
            <td v-show="index == 6">散客数</td>
            <td v-show="index == 7">男客金额</td>
            <td v-show="index == 7">女客金额</td>
            <td v-show="index == 7">日结操作</td>
            <td v-show="index == 7">日结日期</td>
            <td v-show="index == 8">赠送金额</td>
            <td v-show="index == 8">客户挂账金额</td>
          </tr>

          <tr class="second" v-for="(item, index1) in data1" :key="index1">
            <td class="secondtitle">
              {{ item.subcom }}
            </td>
            <td v-show="index == 1">
              {{ item.date }}
            </td>
            <td v-show="index == 1" class="red">
              {{ item.ispay }}
            </td>
            <td v-show="index == 1">
              {{ item.allprice }}
            </td>
            <td v-show="index == 2">
              {{ item.productpay }}
            </td>
            <td v-show="index == 2">
              {{ item.cardpay }}
            </td>
            <td v-show="index == 2">
              {{ item.usepay }}
            </td>
            <td v-show="index == 3" colspan="4">
              <table style="width: 100%">
                <tr>
                  <td style="width: 25%" v-show="index == 3">
                    {{ item.count1 }}
                  </td>
                  <td style="width: 25%" v-show="index == 3">
                    {{ item.count1money }}
                  </td>
                  <td style="width: 25%" v-show="index == 3">
                    {{ item.count1bank }}
                  </td>
                  <td style="width: 25%" v-show="index == 3">
                    {{ item.count1guazhang }}
                  </td>
                </tr>
              </table>
            </td>

            <td v-show="index == 4" colspan="4">
              <table style="width: 100%">
                <tr>
                  <td style="width: 25%" v-show="index == 4">
                    {{ item.count2 }}
                  </td>
                  <td style="width: 25%" v-show="index == 4">
                    {{ item.count2money }}
                  </td>
                  <td style="width: 25%" v-show="index == 4">
                    {{ item.count2bank }}
                  </td>
                  <td style="width: 25%" v-show="index == 4">
                    {{ item.count2guazhang }}
                  </td>
                </tr>
              </table>
            </td>
            <td v-show="index == 5">
              {{ item.banan }}
            </td>
            <td v-show="index == 5">
              {{ item.shopmoney }}
            </td>
            <td v-show="index == 5" class="blue">
              {{ item.shouldpay }}
            </td>
            <td v-show="index == 5" class="red">
              {{ item.hadpay }}
            </td>
            <td v-show="index == 6">
              {{ item.man }}
            </td>
            <td v-show="index == 6">
              {{ item.woman }}
            </td>
            <td v-show="index == 6">
              {{ item.point }}
            </td>
            <td v-show="index == 6">
              {{ item.nopoint }}
            </td>
            <td v-show="index == 7">
              {{ item.manpay }}
            </td>
            <td v-show="index == 7">
              {{ item.womanpay }}
            </td>
            <td v-show="index == 7">
              {{ item.person }}
            </td>
            <td v-show="index == 7">
              {{ item.enddata }}
            </td>
            <td v-show="index == 8">
              {{ item.givemoney }}
            </td>
            <td v-show="index == 8">{{ item.guazhangmoney }}</td>
          </tr>
        </table>
      </v-touch>
    </div>
    <van-pagination
      class="bottompage"
      v-model="currentPage"
      :page-count="page"
      @change="pagechage"
    />
  </div>
</template>

<script>
import {
  Cell,
  NavBar,
  Icon,
  CellGroup,
  Card,
  Button,
  Popup,
  Collapse,
  CollapseItem,
  NoticeBar,
  DatetimePicker,
  Image,
  Empty,
  Sticky,
  Pagination,
} from "vant";

import { timeday } from "@/methods/time";
import { OutOne_find } from "@/API/outone.js";
export default {
  data() {
    return {
      page: "",
      currentPage: 1,
      List: [
        { show: false, bottom: false },
        { show: false, bottom: false },
      ],
      container: null,
      data: [
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
        {
          subcom: "伊美东平店",
          date: "20201104",
          ispay: "已结",
          allprice: "13000",
          productpay: "450",
          cardpay: "0",
          usepay: "10100",
          count1: "1",
          count1money: "1000",
          count1bank: "1000",
          count1guazhang: "1000",
          count2: "1",
          count2money: "1000",
          count2bank: "1000",
          count2guazhang: "1000",
          banan: "0",
          shopmoney: "500",
          shouldpay: "11000",
          hadpay: "110000",
          man: "36",
          woman: "56",
          point: "0",
          nopoint: "110",
          manpay: "3300",
          womanpay: "5890",
          person: "伊美东平店",
          enddata: "2017-01-01 18:20",
          givemoney: "500",
          guazhangmoney: "0",
        },
      ],
      Listtrue: [],
      data1: [],
      activeNames: [],
      begindate: "",
      enddate: "",
      showtime: false,
      showendtime: false,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      outno: "",
      empty: false,
      index: 1,
    };
  },
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [NoticeBar.name]: NoticeBar,
    [DatetimePicker.name]: DatetimePicker,
    [Image.name]: Image,
    [Empty.name]: Empty,
    [Sticky.name]: Sticky,
    [Pagination.name]: Pagination,
  },

  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onClickRight() {},
    swipeLeft() {
      if (this.index < 8) {
        this.index++;
      }
      console.log(this.currentPage);
    },
    swipeRight() {
      if (this.index != 1) {
        this.index--;
      }
    },
    pagechage() {
      var that = this;
      this.data1 = this.data.filter(function (item, index) {
        if (
          index >= (that.currentPage - 1) * 8 &&
          index < that.currentPage * 8
        ) {
          console.log(index); //找出所有大于229的元素
          return item;
        }
      });
      console.log(this.data1);
    },
    handleEndDateConfirm(value) {
      this.timeShow = false;
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.begindate = timer;
      this.showtime = false;
    },
    endhandleEndDateConfirm(value) {
      this.timeShow = false;
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.enddate = timer;
      this.showendtime = false;
    },
  },
  created() {
    this.page = Math.ceil(this.data.length / 8);
    console.log(this.page);
    var that = this;
    this.data1 = this.data.filter(function (item, index) {
      if (index >= (that.currentPage - 1) * 8 && index < that.currentPage * 8) {
        console.log(item); //找出所有大于229的元素
        return item;
      }
    });
    console.log(this.data1);
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-cell-group {
  margin-left: 5%;
}
.van-cell-group td {
  width: 50%;
}
.van-cell {
  text-align: left;
}
.fright {
  text-align: left;
}
.bankpopup {
  padding-top: 3vh;
  padding-bottom: 3vh;
}
.bankone {
  border-radius: 0.3rem;
  width: 90%;
  font-size: 0.7rem;
  margin-left: 5%;
  color: white;
  background-color: #157aff;
  margin-bottom: 3vh;
}
.banktwo {
  border-radius: 0.3rem;
  width: 80%;
  font-size: 0.7rem;
  margin-left: 10%;
  color: white;
  background-color: #25d07a;
}
.bankcenter {
  width: 90%;
  margin-left: 5%;
}
/deep/ .van-nav-bar__text {
  color: white;
}
.banktimecenter {
  text-align: left;
  width: 90%;
  margin-left: 5%;
}
.banktable {
  width: 100%;
  background: #f8f8f8;
}
.chart {
  width: 98%;
  margin-left: 1%;
  height: 100px;
}
.chart td {
  height: 48px;
}
.firstchart {
  width: 20%;
}
.secondchart {
  margin: 0;
  padding: 0;
  width: 100%;
}
.secondchart td {
  height: 23px;
}
.charttitle {
  color: #333333;
  background-color: #f4f6ff;
  font-weight: bold;
}
.chart .secondtitle {
  color: #333333;
  font-weight: bold;
}
.chart .second {
  font-size: 0.5rem;
  border-bottom: 1px solid #eff3f3;
}
.main {
  margin-left: 5%;
  width: 90%;
  height: 70vh;
  overflow: hidden;
}
.bottompage {
  margin-left: 10%;
  width: 80%;
}
.red {
  color: red;
}
.blue {
  color: #2855fa;
}
</style>
