<template>
    <div>
        <div :class="$style.order">
            <el-card :class="$style.card">
                <div :class="$style.header" slot="header">托运方</div>
                <form-view :show-label="false" :inline="false" :target="order" :fields="SELLER_INFO"/>
            </el-card>
            <el-card :class="$style.card">
                <div :class="$style.header" slot="header">收货方</div>
                <form-view :show-label="false" :inline="false" :target="order" :fields="BUYER_INFO"/>
            </el-card>
            <el-card :class="$style.card">
                <div :class="$style.header" slot="header">货物信息</div>
                <form-view :show-label="false" :inline="false" :target="order" :fields="PRODUCT_INFO"/>
            </el-card>
        </div>
        <div :class="$style.buttonContainer">
            <el-button type="primary" :class="$style.button" @click.native="submit">提交订单</el-button>
        </div>
    </div>
</template>
<style module>
    .order, .buttonContainer {
        display: flex;
        flex-wrap: wrap;
    }
    .buttonContainer {
        justify-content: center;
    }
    .button {
        width: 200px;
    }
    .card {
        flex: 1 1 0;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .header {
        font-size: 24px;

    }
</style>
<script>
import FormView from '../components/form-view'
import { POST } from '../api'
import { PRODUCT_INFO, BUYER_INFO, SELLER_INFO } from '../fields/order'
import { resolveOptionData } from '../fields'

export default {
    name: 'order-place',
    components: { FormView },
    data: () => ({
        PRODUCT_INFO, BUYER_INFO, SELLER_INFO,
        order: {
            loadaddr: '',
            loaddateddl: '',
            sellerman: '',
            sellerphone: '',
            unloadaddr: '',
            unloaddateddl: '',
            buyerman: '',
            buyerphone: '',
            packettype: '',
            productweight: '',
            productvol: ''
        }
    }),
    watch: {
        'order.sellersid'(id) {
            let seller = resolveOptionData(SELLER_INFO, 'sellersid', id)
            if (!seller) return
            this.order.loadaddr = seller.address
            this.order.seller = seller.name
            this.order.sellerman = seller.manname
            this.order.sellerphone = seller.phone
        },
        'order.buyersid'(id) {
            let buyer = resolveOptionData(BUYER_INFO, 'buyersid', id)
            if (!buyer) return
            this.order.unloadaddr = buyer.address
            this.order.buyer = buyer.name
            this.order.buyerman = buyer.manname
            this.order.buyerphone = buyer.phone
        },
        'order.productsid'(id) {
            let product = resolveOptionData(PRODUCT_INFO, 'productsid', id)
            if (!product) return
            this.order.producttype = '' + product.type
            this.order.packettype = '' + product.packettype
        }
    },
    methods: {
        submit() {
            POST('/order/order', this.order)
        }
    }
}
</script>