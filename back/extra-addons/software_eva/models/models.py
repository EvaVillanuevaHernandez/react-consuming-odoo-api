#-*- coding: utf-8 -*-

from odoo import models, fields, api


class software_eva_empresas_contratadoras(models.Model):
    _name = 'software_eva.empresas_contratadoras'
    _description = 'software_eva.empresas_contratadoras'

    name = fields.Integer(string="Codigo del contrato")
    empresa = fields.Char(string="Nombre de la empresa")
    contrato = fields.Char(string="Tipo de contrato")
    pago = fields.Integer(string="Pago por hora")
    horas = fields.Integer(string="Número de horas")
    pago_total = fields.Integer(string="Pago por horas",compute="_pago_total",store=True)
    description = fields.Text()
    proyecto = fields.One2many("project.project","empresas",string="Proyectos")

    @api.depends('pago','horas')
    def _pago_total(self):
        for r in self:
            if r.pago > 0:
                r.pago_total = r.pago * r.horas

class software_eva_proyecto(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'
    empresas = fields.Many2one("software_eva.empresas_contratadoras",string="Empresa",ondelete="cascade")
