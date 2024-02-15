<template>
  <div
    @click="tryClose"
    data-notify="container"
    class="alert bg-info text-dark rounded-pill shadow"
    :class="[verticalAlign, horizontalAlign]"
    role="alert"
    :style="customPosition"
  >
    <button
      v-if="showClose"
      type="button"
      aria-hidden="true"
      class="close"
      data-notify="dismiss"
      @click="close"
    >
      <i class="nc-icon nc-simple-remove"></i>
    </button>
    <span data-notify="message">
         <span v-if="icon" data-notify="icon" :class="[icon]"></span>
      <div class="title ml-5">
        <b>Notificacion<br/></b>
        <div v-if="message" v-html="message"></div>
      </div>
    </span>
  </div>
</template>
<script>
export default {
  name: "notification",
  components: {
    contentRender: {
      props: ["component"],
      render(h) {
        return h(this.component);
      },
    },
  },
  props: {
    message: String,
    title: String,
    icon: String,
    verticalAlign: {
      type: String,
      default: "",
    },
    horizontalAlign: {
      type: String,
      default: "",
    },

    timeout: {
      type: Number,
      default: 3000,
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      elmHeight: 0,
    };
  },
  computed: {
    customPosition() {
      let initialMargin = 20;
      let alertHeight = this.elmHeight + 10;
      let sameAlertsCount = this.$notifications.state.filter((alert) => {
        return (
          alert.horizontalAlign === this.horizontalAlign &&
          alert.verticalAlign === this.verticalAlign &&
          alert.timestamp <= this.timestamp
        );
      }).length;
      let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin;
      let styles = {};
      if (this.verticalAlign === "top") {
        styles.top = `${pixels}px`;
      } else {
        styles.bottom = `${pixels}px`;
      }
      return styles;
    },
  },
  methods: {
    close() {
      this.$emit("close", this.timestamp);
    },
    tryClose(evt) {
      if (this.clickHandler) {
        this.clickHandler(evt, this);
      }
      if (this.closeOnClick) {
        this.close();
      }
    },
  },
  mounted() {
    this.elmHeight = this.$el.clientHeight;
    if (this.timeout) {
      setTimeout(this.close, this.timeout);
    }
  },
};
</script>
<style lang="scss">
.notifications .alert {
  position: fixed;
  z-index: 10000;

  &[data-notify="container"] {
    width: 300px;
    cursor: pointer;
  }
  &.right {
    right: 20px;
  }
}
</style>
