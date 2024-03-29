"""add user_name to completed_challenge table

Revision ID: f524c4a47236
Revises: 74f03c8be8dd
Create Date: 2022-01-17 13:08:53.794787

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'f524c4a47236'
down_revision = '74f03c8be8dd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('completed_challenge', sa.Column('user_name', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('completed_challenge', 'user_name')
    # ### end Alembic commands ###
