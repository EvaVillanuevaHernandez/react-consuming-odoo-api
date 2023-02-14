# -*- coding: utf-8 -*-
{
    'name': "software_eva",

    'summary': """
       Se pretende crear una aplicación personalizada que sirva de apoyo a una empresa de desarrollo de software. """,

    'description': """
        Registro del trabajo en la empersa de software
    """,

    'author': "Eva",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','project'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'security/security.xml',
        'security/ir.model.access.csv',
        'data/project_task_data.xml',
        'reports/empresas_contratadoras_report.xml',
        'reports/empresas_contratadoras_report_view.xml'
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'application':'True',
}
