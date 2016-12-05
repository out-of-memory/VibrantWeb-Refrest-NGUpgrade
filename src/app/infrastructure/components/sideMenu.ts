import {Component, Input} from "@angular/core";


@Component({
    selector:'side-menu',
    template: `<div class="navbar-fixed">
		    <nav class="dark-gray">
                <ul id="slide-out" class="side-nav">
                    <li class="no-padding first">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">Employee<i><img src="../../assets/images/oval-1.png"/></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li><a href="employee-details.html" class="active">Employee Details</a></li>
                                <li><a href="#!">Employee Search</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                    <li class="no-padding second active">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">My Vibrant Web<i class="fa fa-briefcase" aria-hidden="true"></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li><a href="index.html" class="active">Attendance</a></li>
                                <li><a href="#!">Leave Management</a></li>
                                <li><a href="#!">HelpDesk</a></li>
                                <li><a href="#!">Reports</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                    <li class="no-padding third">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">Finance Process<i class="fa fa-university" aria-hidden="true"></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="active">Expense</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                    <li class="no-padding fourth">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">HR Processes<i class="fa fa-users" aria-hidden="true"></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="active">Separation</a></li>
                                <li><a href="#!">Appraisal</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                    <li class="no-padding fifth">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">Admin Process<i class="fa fa-hourglass-2" aria-hidden="true"></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="active">Travel</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                    <li class="no-padding sixth">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">PMS<i class="fa fa-cubes" aria-hidden="true"></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="active">Resource Allocation</a></li>
                                <li><a href="#!">Timesheet</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                    <li class="no-padding seventh">
                        <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header">Color Theme<i class="fa fa-paint-brush" aria-hidden="true"></i><span><img src="img/down-arrow.png"/></span></a>
                            <div class="collapsible-body">
                            <ul>
                                <li class="classic"><a href="#!" class="active">Classic</a></li>
                            <li class="stability-blue"><a href="#!">Stablity Blue</a></li>
                            <li class="dynamism-orange"><a href="#!">Dynamism Orange</a></li>
                            <li class="balance-grey"><a href="#!">Balance Grey</a></li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </li>
                </ul>
                <ul class="right right-nav">
                    <li class="date-time-text">24 Jun 2016</li> 
                    <li class="date-time-text hide-on-small-and-down">6:29:01 PM</li>
                    <li class="hide-on-small-and-down"><a href="#!">Jon Doe</a></li>
                    <li><a href="#!"><i class="fa fa-power-off" aria-hidden="true"></i></a></li>
                </ul>
                <a href="#" data-activates="slide-out" class="button-collapse menu-icon show-on-large"><i class="fa fa-bars" aria-hidden="true"></i></a>
                <h5 class="header-title">
                    <a href="index.html">VIBRANT <span>WEB</span></a>
                </h5>
            </nav>
        </div>`
})

export class SideMenu {

@Input() visible:boolean;

}