<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: 'd2-svg',
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#d2-${this.name}`
        },
        svgClass() {
            if (this.className) {
                return 'd2-svg-icon ' + this.className
            } else {
                return 'd2-svg-icon'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.d2-svg-icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
}
</style>
