import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/system/server/api_share';
import { ConfigServerService } from 'src/app/system/server/config/config-server.service';

@Component({
  selector: 'app-select-box-company',
  templateUrl: './select-box-company.component.html',
  styleUrls: ['./select-box-company.component.scss'],
})
export class SelectBoxCompanyComponent implements OnInit {
  dataSource: Company[] = [];

  constructor(
    private httpClient: HttpClient,
    private configServerService: ConfigServerService
  ) {}
  ngOnInit(): void {}
}
