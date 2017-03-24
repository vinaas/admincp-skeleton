export const childView: string = `<template>

  <div class="bar">
    <div class="pull-right">
      <a href="#" class="text-black padding-10 visible-xs-inline visible-sm-inline pull-right m-t-10 m-b-10 m-r-10 on" data-pages="horizontal-menu-toggle">
        <i class=" pg-close_line"></i>
      </a>
    </div>
    <div class="bar-inner">
      <ul>
        <li repeat.for="row of router.navigation" class="\${row.isActive ? 'active' : ''}">
          <a href.bind="row.href">
            <span class="">\${row.title}</span>
          </a>
        </li>

      </ul>
    </div>
  </div>


  <!-- START CONTAINER FLUID -->
  <div class="container-fluid container-fixed-lg">
    <div class="inner">
        
    <!-- BEGIN PlACE PAGE CONTENT HERE -->
    <router-view></router-view>

    <!-- END PLACE PAGE CONTENT HERE -->
  </div>
  <!-- END CONTAINER FLUID -->
  </div>
  <!-- END PAGE CONTENT -->
</template>
`