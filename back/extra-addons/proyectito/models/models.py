# -*- coding: utf-8 -*-

from odoo import models, fields, api


# class proyectito(models.Model):
#     _name = 'proyectito.proyectito'
#     _description = 'proyectito.proyectito'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

class proyectito(models.Model):
    _name = 'project.task'
    _inherit = 'project.task' 
    _description = 'project.task'

    jefe = fields.Char()
#     # value = fields.Integer()
#     # value2 = fields.Float(compute="_value_pc", store=True)