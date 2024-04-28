<template>
	<div class="dropdown-title">

		<div class="title-box">

			<div :class="['tit', item.isCheck ? 'active' : '']" v-for="(item, index) in titData" @click="toggleShow(index)">
				{{ item.tit }}
				<div class="btn">
					<u-icon :name="item.arrowUp ? 'arrow-up' : 'arrow-down'" :color="item.isCheck ? '#4985F6' : '#909399'">
					</u-icon>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
export default {
	props: {
		titData: {
			type: Array,
			required: false,
			default: () => {
				return [];
			}
		},
	},
	data() {
		return {

		}
	},
	created() {
	},
	methods: {
		toggleShow(index) {
			this.$emit('titToggle', {index:index});
		}
	}
}
</script>

<style lang="scss">
.dropdown-title {
	text-align: center;
	position: relative;
	z-index: 2;
	background-color: #fff;

	.title-box {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;

		.tit {
			font-size: 28rpx;
			flex-grow: 1;

			&.active {
				color: #4985F6;
			}

			.btn {
				display: inline-block;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
